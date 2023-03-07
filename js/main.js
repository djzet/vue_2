let eventBus = new Vue();

Vue.component('notes',{
    template: `
        <div class="table_div">
            <notes-1></notes-1>
            <notes-2></notes-2>
            <notes-3></notes-3>
</div>
    `,
    data(){
        return{

        }
    }
})

Vue.component('notes-1',{
    template: `
        <div class="notes_div">
            <h2>Созданные</h2>
               
</div>
    `,
    data(){
        return{
            id: 1,
            list: []
        }
    }
})

Vue.component('notes-2',{
    template: `
        <div class="notes_div">
            <h2>В процессе</h2>                      
</div>
    `,
    data(){
        return{
            id: 2,
            list: []
        }
    }
})

Vue.component('notes-3',{
    template: `
        <div class="notes_div">
            <h2>Завершенные</h2> 
</div>
    `,
    data(){
        return{
            id: 3,
            list: []
        }
    }
})

Vue.component('notes-form',{
    template: `
        <div class="form_div">
            <h2>Создать заметку</h2> 
                <form class="form" @submit.prevent="onSubmit">
                    <textarea id="review" v-model="review"></textarea>
                    <input type="submit" value="Создать"> 

</form>
</div>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
        }
    },
    methods: {
        onSubmit() {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating}
                eventBus.$emit('review-submitted', productReview);
                this.name = null
                this.review = null
                this.rating = null
        }
    }
})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
<p v-if="errors.length">
 <b>Please correct the following error(s):</b>
 <ul>
   <li v-for="error in errors">{{ error }}</li>
 </ul>
</p>
 <p>
   <label for="name">Name:</label>
   <input id="name" v-model="name" placeholder="name">
 </p>
 <p>
   <label for="review">Review:</label>
   <textarea id="review" v-model="review"></textarea>
 </p>
 <p>
   <label for="rating">Rating:</label>
   <select id="rating" v-model.number="rating">
     <option>5</option>
     <option>4</option>
     <option>3</option>
     <option>2</option>
     <option>1</option>
   </select>
 </p>
 <p>
   <input type="submit" value="Submit"> 
 </p>
</form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            this.errors = []
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                eventBus.$emit('review-submitted', productReview);
                this.name = null
                this.review = null
                this.rating = null
            }
            else {
                if(!this.name) this.errors.push("Name required.");
                if(!this.review) this.errors.push("Review required.");
                if(!this.rating) this.errors.push("Rating required.");
            }
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
    },
})