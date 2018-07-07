class Picker {
    constructor() {
        this.started = false;
        this.speech = window.speechSynthesis;
        this.utterance = new SpeechSynthesisUtterance();

        $('#start').click(() => {
            const maxCalls = $('#max-calls').val();
            const names = $('#names').val().split('\n');
            this.hat = [];
            names.forEach(name => {
                for (let i = 0; i < maxCalls; ++i) {
                    this.hat.push(new NameCard(name));
                }
            });
            Picker.shuffle(this.hat);
            this.started = true;
        });

        $('#pick').click(() => {
            this.hat = this.hat.filter(card => card.picking === 0);
            if (this.started && this.hat.length) {
                const chosenIndex = Math.floor(Math.random() * this.hat.length);
                const card = this.hat[chosenIndex];
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
