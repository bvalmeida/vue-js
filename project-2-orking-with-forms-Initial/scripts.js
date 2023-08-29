members = [
    {
        fname: 'John',
        lname: 'Lennon',
        instrument: 'Violão'
    },
    {
        fname: 'George',
        lname: 'Harrison',
        instrument: 'Guitarra'
    }
]

const handlingForms = {

    data() {
        return {
            members: window.members,

            newMembers: {},
        }
    }, methods: {
        saveNewMember: function(){
            if(this.validateMember()){
                this.members.push(this.newMembers);
                this.newMembers = {}
            }else{
                alert('Algum campo está vazio, revise e tente novamente')
            }
        },

        validateMember: function(){
            if(this.newMembers.fname && this.newMembers.lname && this.newMembers.instrument){
                return true
            }else{
                return false
            }
        }
    }

};

Vue.createApp(handlingForms).mount('#app');
