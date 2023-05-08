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

    updateState(){
        $('#title').attr('placeholder', this.title)
        $('#tempo').attr('placeholder', this.tempo)
    }

    listenState(){
        $('#title').on('change', function(text){
            console.log('bg')
        })
    }
}

function startEmptyProject(){
    let emptyProject = new Project()
    emptyProject.updateState()
    emptyProject.listenState()
}

export default Project;
export {startEmptyProject}