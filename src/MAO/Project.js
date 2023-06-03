import { v4 as uuidv4 } from 'uuid';
import $ from 'jquery'

class Project {
    constructor(title = "Sans titre", tempo = 120, theme = "default", tracks = []){
        this.id = uuidv4()
        this.title = title
        this.tempo = tempo
        this.theme = theme
        this.tracks = tracks
    }

    loadState(){
        $('#title').html(this.title)
        $('#tempo').html(this.tempo)
    }

    listenUpdate(){
        $('#title').on('click', () =>{
            $('#title').on('keydown', ()=>{
                if ($('#title').html().length > this.title.length){
                    this.title = $('#title').html()
                    console.log(this.title)
                }
            })
            $('#title').on('mouseleave', () => {
                $(document).on('click', e => {
                    e.stopImmediatePropagation()
                    this.title = $('#title').html()
                    console.log(this.title);
                })
            })
        })
        $('#tempo').on('click', () =>{ 
            $('#tempo').on('keydown', ()=>{
                if ($('#tempo').html().length > this.tempo.length){
                    this.tempo = $('#tempo').html()
                    console.log(this.tempo);
                }    
            })
       
            $('#tempo').on('mouseleave', () => {
                $(document).on('click', (e) => {
                    e.stopImmediatePropagation()
                    this.tempo = $('#tempo').html()
                console.log(this.tempo);
                })
            })
        })
    }

    saveProject(tracks){
        
    }
}

function startEmptyProject(){
    let emptyProject = new Project()
    emptyProject.loadState()
    emptyProject.listenUpdate()
}

export default Project;
export {startEmptyProject}