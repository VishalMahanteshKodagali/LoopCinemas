module.exports = (express, app) => {
    const controller = require("../controllers/review.controller.js");
    const router = express.Router();
  
    // Select all reviews.
    router.get("/", controller.all);
  
    // Create a new review.
    router.post("/", controller.create);


    router.delete("/:reviewId",controller.delete);
    //Sample
    //localhost:4000/api/reviews/1

    router.put("/:reviewId",controller.update);
    //Sample
    //localhost:4000/api/reviews/1
  
    // Add routes to server.
    app.use("/api/reviews", router);
  };
  