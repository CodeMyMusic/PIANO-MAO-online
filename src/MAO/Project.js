import { v4 as uuidv4 } from 'uuid';

class Project {
    constructor(name = "Sans titre", tempo = 120, theme = "default", tracks = []){
        this.id = uuidv4()
        this.name = name
        this.tempo = tempo
        this.theme = theme
        this.tracks = tracks
    }

    display(){
    }
}

export default Project