class Track {
    static nextId = 1
    constructor(file, instrumentId = 0){
        this.nb = Track.nextId
        this.file = file;
        this.instrumentId = instrumentId;

        Track.nextId++
    }

    deleteTrack(){
        
    }
}

export default Track