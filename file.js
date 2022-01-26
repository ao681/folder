
document.addEventListener('DOMContentLoaded', async () => {
  // Load the publishable key from the server. The publishable key
  // is set in your .env file.
  

  const {publishableKey} = await fetch('/config').then((r) => r.json());
  

  if (!publishableKey) {
    addMessage(
      'No publishable key returned from the server. Please check `.env` and try again'
    );
    alert('Please set your Stripe publishable API key in the .env file');
  }

  const stripe = Stripe(publishableKey, {
    apiVersion: '2020-08-27',
  });

  const elements = stripe.elements();
  const card = elements.create('card');
  card.mount('#card-element');

  // When the form is submitted...
  total = ag().total;
  
  const form = document.getElementById('payment-form');
  let submitted = false;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable double submission of the form
    if(submitted) { return; }
    submitted = true;
    form.querySelector('button').disabled = true;

    // Make a call to the server to create a new
    // payment intent and store its client_secret.
  



    total = ag().total;

    const {error: backendError, clientSecret} = await fetch(
      '/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          
   
          currency: 'usd',
           amount: total,
          paymentMethodType: 'card',
        }),

        

      }
    ).then((r) => r.json());

    if (backendError) {
      addMessage(backendError.message);

      // reenable the form.
      submitted = false;
      form.querySelector('button').disabled = false;
      return;
    }

    addMessage(`Client secret returned.`);

    const nameInput = document.querySelector('#name');

    // Confirm the card payment given the clientSecret
    // from the payment intent that was just created on
    // the server.
    const {error: stripeError, paymentIntent} = await stripe.confirmCardPayment(
      clientSecret, 
      {
        
        payment_method: {
          card: card,
          
          billing_details: {
            name: nameInput.value,
           
          },
        },
      }
    );

    if (stripeError) {
      addMessage(stripeError.message);

      // reenable the form.
      submitted = false;
      form.querySelector('button').disabled = false;
      return;
    }

    addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
  });
});




 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyBIwY3QxssBu204uP7mLvA8tg1DaO2Azbk",
  authDomain: "shopbox-433dd.firebaseapp.com",
  projectId: "shopbox-433dd",
  storageBucket: "shopbox-433dd.appspot.com",
  messagingSenderId: "273435131787",
  appId: "1:273435131787:web:a6b2d3c2d68f9d3365f98e",
  measurementId: "G-BHMYC8VZ"
};

var firebase= firebase.initializeApp(config);
var db = firebase.firestore();

         firebase.auth();

      
ag();


function ag() {



firebase.auth().onAuthStateChanged((user) => {
if (user) {
  db.collection("Basket").where("user", "==", firebase.auth().currentUser.uid)

  

  .onSnapshot(function(snapshot) {
    document.getElementById("messages").innerHTML ="";
    
    let total= 0;

  
    snapshot.forEach(element => {  
      
      let data = element.data();
      let price = data.price;
      let numPrice = Number(price);

      if (! numPrice) {
       
        numPrice = 0;
      }
      total = total + numPrice;
           
      
      document.getElementById("demoo").innerHTML = total;
        
  }); 
  console.log('price is not a number: ',total);
  }, function(error) {
    console.log(snapshot)
  });
}});

}
