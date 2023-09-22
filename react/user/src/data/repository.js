const USERS_KEY = "users";
const USER_KEY = "user";
const MOVIE_REVIEWS = "movieReviews";

const movies = [
  { title: "Gran Turismo", sessionTime: "10:00 AM, 2:00 PM" , image:"./gran_card.png", corouselImage:"./gran.png"},
  { title: "Blue Beetle", sessionTime: "11:00 AM, 3:00 PM" ,image:"./blue_card.png", corouselImage:"./blue.png" },
  { title: "Oppenheimer", sessionTime: "12:00 PM, 4:00 PM" ,image:"./oppenheimer_card.png", corouselImage:"./oppenheimer.png" },
]
const movieRatings = [
  {
    movieReviewId: 1,
    movieTitle: "Gran Turismo",
    rating: 4,
    comments: "Great movie, loved it!",
    userId: 1,
  },
  {
    movieReviewId: 2,
    movieTitle: "Blue Beetle",
    rating: 1,
    comments: "One of the best movies I've seen!",
    userId: 1,
  },
  {
    movieReviewId: 3,
    movieTitle: "Oppenheimer",
    rating: 5,
    comments: "One of the best movies I've seen!",
    userId: 1,
  },
]
// Check if data is already initialized before proceeding with initialization
function initializeLocalStorage() {
  if (!localStorage.getItem(USERS_KEY)) {
    const users = [
      {
        username: "mbolger",
        password: "abc123"
      },
      {
        username: "shekhar",
        password: "def456"
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  if (!localStorage.getItem(MOVIE_REVIEWS)) {
    // Assume movieRatings is already defined
    localStorage.setItem(MOVIE_REVIEWS, JSON.stringify(movieRatings));
  }
  if (!localStorage.getItem('userReviewCount')) {
    // Assume movieRatings is already defined
  }
  
}



function getUsers() {
  // Extract user data from local storage.
  const data = localStorage.getItem(USERS_KEY);

  // Convert data to objects.
  return JSON.parse(data);
}

function verifyUser(username, password) {
  const users = getUsers();
  for(const user of users) {
    if(username === user.username && password === user.password)
    {
      setUser(username);
      return true;
    }
  }

  return false;
}

function setUser(username) {
  localStorage.setItem(USER_KEY, username);
}


function getUser() {
  return localStorage.getItem(USER_KEY);
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}
function saveUser(user){
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  setUser(user.username);
}
function updateUser(currentUsername,fields){
  const users = getUsers();
  for(const user of users) {
    if(currentUsername === user.username)
    {
      user.username = fields.username;
      user.email = fields.email;
      setUser(user.username);
      break;
    }
  }
  

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function deleteUser(username){
  let users = getUsers();
  users = users.filter(
    (u) => u.userId === username 
  )
  localStorage.setItem(USERS_KEY, JSON.stringify(users)); 
  removeUser();
  window.location.href = "http://localhost:3000/login";
  
}
function getMovieReviews(){
  const data = localStorage.getItem(MOVIE_REVIEWS);

  // Convert data to objects.
  return JSON.parse(data);
}
function deleteMovieReviews(selectedReview){
  

  const reviews = getMovieReviews();
  for(const r of reviews) {
    if(r.userId === selectedReview.userId && r.movieTitle === selectedReview.movieTitle)
    {
      var index = reviews.indexOf(r);
      if (index !== -1) {
        reviews.splice(index, 1);
}
    }
  }

  localStorage.setItem(MOVIE_REVIEWS, JSON.stringify(reviews));
  
}
function editMovieRatings(selectedMoviewReview) {
  //deleteMovieReviewbyId(selectedMoviewReview);
  console.log("Before",getMovieReviews())
  const reviews = getMovieReviews().map((r) =>
    r.movieReviewId === selectedMoviewReview.movieReviewId
      ? selectedMoviewReview
      : r
  );

  localStorage.setItem(MOVIE_REVIEWS, JSON.stringify(reviews));
  console.log("After",getMovieReviews())

}

function deleteMovieReviewbyId(selectedReview){
  
  const reviews = getMovieReviews();
  for(const r of reviews) {
      if(r.movieReviewId === selectedReview.movieReviewId)
      {
        var index = reviews.indexOf(r);
        if (index !== -1) {
          reviews.splice(index, 1);
      }
    }
  }

  localStorage.setItem(MOVIE_REVIEWS, JSON.stringify(reviews));
  
}
function updateMovieRatings(rating){
  const movieReviews = getMovieReviews();
  movieReviews.push(rating);
  localStorage.setItem(MOVIE_REVIEWS, JSON.stringify(movieReviews));
 
}
function getLoggedInUserDetails(){
  let tempUser = getUser()
  const users = getUsers();
  for(const user of users) {
    if(tempUser === user.username )
    {
      return user
    }
  }
}
function deleteUserMovieReviews(username){
  let reviews = getMovieReviews();
  reviews = reviews.filter(review=> review.userId !== username);
  localStorage.setItem(MOVIE_REVIEWS, JSON.stringify(reviews));

}

export {
  initializeLocalStorage,
  verifyUser,
  getUser,
  removeUser,
  saveUser,
  updateUser,
  deleteUser,
  getLoggedInUserDetails,
  movies,
  movieRatings,
  updateMovieRatings,
  getMovieReviews,
  deleteMovieReviews,
  deleteUserMovieReviews,
  deleteMovieReviewbyId,
  editMovieRatings
}
