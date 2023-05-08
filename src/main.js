import rainBowAnimation from './OUI.js'
import synth from "./piano3D.js"
import trackView from "./trackView.js"
import {startEmptyProject} from './MAO/Project.js'
import scheme from './theme.js'

window.addEventListener('DOMContentLoaded', function () { 
    rainBowAnimation()  
    synth();
    trackView()
    startEmptyProject()
})

/* window.addEventListener('beforeunload', (e) => {
    e.returnValue = 'All unsaved work will be lost';
  }); */
  