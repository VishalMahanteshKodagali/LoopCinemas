module.exports = (express, app) => {
    const controller = require("../controllers/movie.controller.js");
    const router = express.Router();
  
    // Select all posts.
    router.get("/", controller.all);
    router.get("/:movieId",controller.getMovieId);
  
    // Create a new post.
    router.post("/", controller.create);

    router.delete("/:movieId",controller.delete);
    //Sample
    //localhost:4000/api/movies/1

    router.put("/:movieId",controller.update);
    //Sample
    //localhost:4000/api/movies/1
  
    // Add routes to server.
    app.use("/api/movies", router);
  };
  