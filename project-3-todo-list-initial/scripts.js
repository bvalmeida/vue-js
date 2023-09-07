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
            this.todoLists = [];
            localStorage.clear();
        },

        addTodo: function(){
            if(this.newTodo.message){
                this.todoLists.push(this.newTodo);
                this.newTodo = {
                    active: false
                };

                this.storeTodosOnLocalStorage();
            }else{
                alert('Text not be empyt');
            }
        },
        storeTodosOnLocalStorage: function(){
            localStorage.setItem('to-dos', JSON.stringify(this.todoLists));
        }
    },
    created(){
        this.todoLists = localStorage.getItem('to-dos') ? JSON.parse(localStorage.getItem('to-dos')) : this.todoLists;
    },
    updated(){
        this.storeTodosOnLocalStorage();
    }
};

Vue.createApp(todoList).mount('#todoList');