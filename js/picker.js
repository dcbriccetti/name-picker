class Picker {
    constructor() {
        this.speech = window.speechSynthesis;
        this.utterance = new SpeechSynthesisUtterance();
        this.cardSpace = [];

        $('#start').click(() => {
            const maxCalls = $('#max-calls').val();
            const names = $('#names').val().split('\n');
            this.cardSpace = [];
            names.map(name => name.trim()).filter(name => name.length > 0).forEach(name => {
                for (let i = 0; i < maxCalls; ++i) {
                    this.cardSpace.push(new NameCard(name));
                }
            });
            Picker.shuffle(this.cardSpace);
        });

        $('#pick').click(() => {
            this.cardSpace = this.cardSpace.filter(card => card.state === card.States.NORMAL);
            if (this.cardSpace.length) {
                const chosenIndex = Math.floor(Math.random() * this.cardSpace.length);
                const card = this.cardSpace[chosenIndex];
                card.pick();
                $('#chosen').text(card.name);
                if ($('#speak').prop('checked')) {
                    this.utterance.text = card.name;
                    this.speech.speak(this.utterance);
                }
            }
        });
    }

    static shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
    }
}
