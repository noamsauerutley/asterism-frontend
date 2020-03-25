import React from 'react'
import { StyledButton } from '../assets/StyledComponents'

class  DownloadStories extends React.Component {

  // story format functions

  // story.story_notes
  formatStoryNotes = (story_notes) => {
    return story_notes ? String("STORY NOTES \n" + story_notes.map(story_note => story_note.text).join() + "\n\n") : ""
  }

  // story.character.image.image_note
  formatCharacterImageNote = (image_note) => {
    return image_note ? String("NOTE \n" + image_note + "\n\n") : ""
  }

  // story.character.images
  formatCharacterImages = (images) => {
    return images ? String("IMAGES \n" + images.map(image => image.image_url + "\n" + this.formatCharacterImageNote(image.image_note) + "\n").join() + "\n\n") : ""
  }

  // story.character.appearances
  formatCharacterAppearances = (scenes) => {
    return scenes ? String("APPEARANCES \n" + scenes.map(scene => scene.name + "\n").join() + "\n\n") : ""
  }

  //story.character.character_notes
  formatCharacterNotes = (character_notes) => {
    return character_notes ? String("CHARACTER NOTES \n" + character_notes.map( character_note => character_note.text).join() + "\n\n") : ""
  }
  
  //story.characters
  formatCharacters = (characters) => {
    return characters ? String("CHARACTERS \n\n" + characters.map(character => "NAME \n" + character.name + "\n\n" + "DESCRIPTION \n" + character.description + "\n\n" + this.formatCharacterNotes(character.character_notes) + this.formatCharacterAppearances(character.scenes) + this.formatCharacterImages(character.images) + "\n").join()) : ""
  }

  //story.plot.appearances
  formatSceneAppearances = (characters) => {
    return characters ? String("CHARACTER APPEARANCES \n" + characters.map(character => character.name + "\n\n").join()) : ""
  }

  //story.plot.scenes
  formatPlotScenes = (scenes) => {
    return scenes ? String("SCENES \n\n" + scenes.map(scene => "SCENE NAME \n" + scene.name + "\n\n" + "SCENE SUMMARY \n" + scene.summary + "\n\n" + this.formatSceneAppearances(scene.characters)).join()) : ""
  }

  //story.plot.plot_notes
  formatPlotNotes = (plot_notes) => {
    return plot_notes ? String("PLOT NOTES \n" + plot_notes.map(plot_note  => plot_note.text + "\n\n").join()) : "" 
  }

  //story.plots
  formatPlots = (plots) => {
    return plots ? String( "PLOTS \n\n" + plots.map(plot => "PLOT NAME \n" + plot.name + "\n\n" + "PLOT SUMMARY \n" + plot.summary + "\n\n" +  this.formatPlotNotes(plot.plot_notes) + this.formatPlotScenes(plot.scenes)).join()): ""
  }

  //stories
  formatStories = (stories) => {
    return stories ? String("STORIES \n\n" + stories.map( story => (stories.indexOf(story)+1) + "\n\n TITLE \n" + story.title + "\n\n" + "SUMMARY \n" + story.summary + "\n\n" + this.formatStoryNotes(story.story_notes) + this.formatPlots(story.plots) + this.formatCharacters(story.characters)).join()) : ""
  }

  // fragment format functions
  
  // fragment.fragment_notes
  formatFragmentNotes = (fragment_notes) => {
    return fragment_notes ? String("FRAGMENT NOTES \n" + fragment_notes.map(fragment_note => fragment_note.text + "\n\n").join()) : ""
  }

  //fragments
  formatFragments = (fragments) => {
    return fragments ? String("FRAGMENTS \n\n" + fragments.map(fragment => (fragments.indexOf(fragment)+1) + "\n\n TITLE \n" + fragment.title + "\n\n" + "TEXT \n" + fragment.text + "\n" + this.formatFragmentNotes(fragment.fragment_notes) + "\n\n\n").join()) : ""
  } 

  // all work
  formatWork = (data) => {
    return String(this.formatStories(data.stories) + this.formatFragments(data.fragments))
  }


  download = async () => {
    const element = document.createElement("a")

    let rawData = await fetch(`https://asterism-api.herokuapp.com/authors/${localStorage.user_id}`, {
      method: "GET",
      headers: {
        "Authorization": localStorage.token,
        "Content-Type": "application/json"
            }}) 
    let data = await rawData.json()
    let stringifiedData = this.formatWork(data)
    const file = new Blob([stringifiedData], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = "myFile.txt";
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }
  
  render() {
    return (
      <div>
        <StyledButton onClick={this.download} style={{ margin: "15px", fontSize: "18px"}}>Download Work</StyledButton>
      </div>
    );
  }
}
  export default DownloadStories

