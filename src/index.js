let addToy = false
let toyContainer = document.getElementById("toy-collection") // target the element where toy will land

const handleLikeToy = (event) => {
  console.log(event)
  const clickedButton = event.target
  const toyId = clickedButton.id
  const fetchUrl = `http://localhost:3000/toys/${toyId}`
  const previousLikes = parseInt(infoAboutCurrentLikes.innerText)
  const newLikes = previousLikes + 1

  const infoAboutCurrentLikes = clickedButton.previousSibling

  const configurationObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes = newLikes
    })
  }
  fetch(fetchUrl , configurationObject)
  .then(resp => resp.json)
  .then(updatedToy => {
    paragraphWithLikes.innerText = `${updatedToy.likes} likes`
  })
}

const addToyCard = (toy) => { // Add toys cards to the DOM
  let newToyCard = document.createElement("div") // create a div for the card info to land
  newToyCard.classList.add("card") // added card to the list of classes for the div

  // newToyCard.innerHTML = toy.name // temporary to see if it works
  // toyContainer.append(newToyCard) // appending to the div container


  // Need to target the element for each card to land on page
  
  // h2
  let h2 = document.createElement("h2") // create empty element
  h2.innerText = toy.name // set innerText to the toys name
  
  // img
  let img = document.createElement("img") // create empty element
  img.src = toy.image // set the src of the image to the toy iamge
  img.classList.add("toy-avatar") // add class of toy-avatar
  
  // p tag
  let p = document.createElement("p") // create empty element
  p.innerText = `${toy.likes} likes` // set text of paragraph to toy.likes
  newToyCard.append(p)
  
  // button
  let btn = document.createElement("button") // create empty element
  btn.classList.add("like-btn") // added class list to the button 
  btn.setAttribute("id", toy.id) // set the button attribute 
  btn.innerText = "Like" // set innerText to the word Like for the button 
  btn.addEventListener("click", (event) => handleLikeToy(event)) // add event listener to deal with users clicking the like button 
  
  newToyCard.append(h2, img, p, btn) // append all elements together on one line (refac)
  toyContainer.append(newToyCard) // appending the toy card to the div
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")

  fetch ("http://localhost:3000/toys") // Fetched the toys from the back end 
  .then (resp => resp.json())
  .then (data => { // Iterate over data to add to the DOM
    data.forEach(toy => addToyCard(toy)) // Call Add Toy card for each object
  })

  // Second Deliverable:
  const submitNewToyButton = document.querySelector(".submit")
  submitNewToyButton.addEventListener("click", (event) => {
    event.preventDefault()
    const toyForm = document.querySelector(".add-toy-form")
    const newToyName = toyForm.name.value
    const newToyImage = toyForm.image.value

    const configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: newToyName, // new toy name
        image: newToyImage, // new toy image
        likes: 0 // initial amount of likes (0)
      })
    }
    console.log(configurationObject)

    fetch("http://localhost:3000/toys", configurationObject)
    .then(response => response.json())
    .then(data => {
      addToyCard(data)
    })
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none"
    }
  })
})




/*FIRST OBJECTIVE
- Access the list of toys from an API and render them in a card on the page
 - fech requests to GET toys on page
 - Create one card for every toy
 - each card will have an h2, with the toy's name
 - img tag with the src of the toys image (toy.image)
 - className - "toy-avatar"
 - p tag with how many likes the toy has (toy.likes)
 - button tag with a class "like-btn" and an 
 id attribute set to toys Id (toy.id)
 ** add an event listener for liking the toys 

 Fetch Toys from back end 
- iterate through the response and create a card for every toy
*/

/* SECOND OBJECTIVE
USe fetch request to make a POST request to create a new toy card for the DOM

- Hook up a form that enables users to add new toys
- Create an event listener when teh form is submitted

-User fills out a form 
- the user would click submit on the form 
- the submission would grab the information that was filled out on the form 
- we would wrap the informaion in some sort of payload
  - information about the toy name (name image)
  - 
*/

/* THIRD OBJECTIVE
- gives users the ability to like a toy 
- when the user likes a toy the likes change on the DOM 
- create an event listener that gives uses the abilty to like the toy 
- the event listener will be added to every button as well as new buttons when toys are added
- make a patch request to get the database
- find an example of a config object to go off of
- make sure the method is patch 
- update the body with the information we are trying to change (number of likes)
- send data to the right URL
*/