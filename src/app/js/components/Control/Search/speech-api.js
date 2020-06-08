class SpeechApi {
  constructor(button) {
    const speechToText = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.speechApi = new speechToText();
    this.word = null;

    this.speechApi.continous = true;
    this.speechApi.intetimResult = false;
  }


  init() {
    this.speechApi.start();
  }

  stop() {
    this.speechApi.stop();
  }
}


export default SpeechApi;
