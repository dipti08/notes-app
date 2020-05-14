const fs=require('fs')
const chalk=require('chalk')

const addNote=(title,body)=>{
    const notes=loadNotes()

    //this function will check for all the notes 
    // const duplicateNotes=notes.filter((note)=>{
    //     return note.title===title
    // })

    //this will return true once it finds the similar title
    //this will avoid checking for all the notes
    const duplicateNote=notes.find((note)=>{
        return note.title===title
    })

    //console.log is one of the debugging options
    //debugger
    //But we use 'debugger' and run in the commnd line using
    //node --inspect-brk app.js add .....
    //then go to 'chrome://inspect'
    //add your server address which appears in the terminal
    //inpect the link which appears
    //add your file to view all the contents

    //this will insert if not matching title is found
    if(!duplicateNote)
    {
        notes.push({
            title:title,
            body:body
        })
    
        //console.log(notes)
        saveNotes(notes)
        console.log(chalk.green.inverse('new note is added'))
    }
    else
    {
        console.log(chalk.red.inverse('Note title taken'))
    }
}

const removeNote=(title)=>{
    const notes=loadNotes()
    //find all the notes to keep
    const notesToKeep=notes.filter((note)=>{
        return note.title!==title
    })

    if(notes.length>notesToKeep.length)
    {
        console.log(chalk.green.inverse('Note removed'))
        saveNotes(notesToKeep)
    }else{
        console.log(chalk.red.inverse('No note found'))
    }
    
}

const listNotes=()=>{
    console.log(chalk.green('Your notes'))
    const notes=loadNotes()
    notes.forEach((note)=>{
        console.log(note.title)
    })
}

const readNote=(title)=>{
    const notes=loadNotes()
    const reading=notes.find((note)=>{
        return note.title===title
    })
    if(reading)
    {
        console.log(chalk.inverse(reading.title))
        console.log(reading.body)
    }
    else{
        console.log(chalk.red('Note not found!'))
    }
}

const saveNotes=(notes)=>{
    const dataJSON=JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes=()=>{
    try{
        const dataBuffer=fs.readFileSync('notes.json')
        const dataJSON=dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
    
}

module.exports={
    addNote: addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
}