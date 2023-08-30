todoLists = []

const todoList = {
    data(){
        return{
            todoLists: window.todoLists,

            newTodo: {
                active: false
            }
        }
    }, methods: {
        cleanList: function(){
            this.todoLists = []
        },

        addTodo: function(){
            if(this.newTodo.message){
                this.todoLists.push(this.newTodo)
                this.newTodo = {
                    active: false
                }
            }else{
                alert('Text not be empyt')
            }
        },
    }
};

Vue.createApp(todoList).mount('#todoList');