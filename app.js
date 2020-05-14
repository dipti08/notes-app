const chalk=require('chalk')
const yargs=require('yargs')
const notes=require('./notes.js')

//customise yargs function
yargs.version('1.1.0')

//create add command
yargs.command({
    command:'add',
    describe:'Add a new note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'Required content',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv)
    {
        notes.addNote(argv.title,argv.body)
    }
})

//create remove command
yargs.command({
    command:'remove',
    describe:'Remove a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

//create a list command
yargs.command({
    command:'list',
    describe:'List all the notes',
    handler(){
        notes.listNotes()
    }
})

//create a read command
yargs.command({
    command:'read',
    describe:'Read all the notes',
    builder:{
        title:{
            describe:'Read note',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

yargs.parse()
