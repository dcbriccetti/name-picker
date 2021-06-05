class Picker {
  private readonly p: any
  private readonly pg: any
  private readonly speech: SpeechSynthesis
  private readonly utterance: SpeechSynthesisUtterance
  cardSpace: NameCard[]
  private lastPickedName: string

  constructor(p, pg) {
    this.p = p
    this.pg = pg
    this.speech = window.speechSynthesis
    this.utterance = new SpeechSynthesisUtterance()
    this.cardSpace = []
    this.lastPickedName = null;

    $('#start').click(() => {
      const maxCalls = $('#max-calls').val()
      const names = <string>$('#names').val()
      const lines = names.split('\n')
      this.cardSpace = []
      lines.forEach(line => {
        const parts = line.trim().split('|')
        const name = parts[0]
        if (name) {
          const phoneticName = parts[1] || name
          for (let i = 0; i < maxCalls; ++i) {
            this.cardSpace.push(new NameCard(p, pg, name, phoneticName))
          }
        }
      })
      Picker.shuffle(this.cardSpace)
    })

    $('#pick').click(() => {
      this.cardSpace = this.cardSpace.filter(card => card.state === State.Normal)
      if (this.cardSpace.length) {
        const card = this.chooseCard()
        card.pick()
        this.lastPickedName = card.name
        $('#chosen').text(card.name)
        if ($('#speak').prop('checked')) {
          this.utterance.volume = 0.6
          this.utterance.text = card.phoneticName
          this.speech.speak(this.utterance)
        }
      }
    })
  }

  private chooseCard(): NameCard {
    const eligibleCards = this.getEligibleCards()
    const chosenIndex = Math.floor(Math.random() * eligibleCards.length)
    return eligibleCards[chosenIndex]
  }

  private getEligibleCards(): NameCard[] {
    const uniqueNames = new Set()
    this.cardSpace.forEach(card => uniqueNames.add(card.name))
    return uniqueNames.size > 1 && this.lastPickedName != null ?
      this.cardSpace.filter(card => card.name != this.lastPickedName) :
      this.cardSpace
  }

  static shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
    }
  }
}
