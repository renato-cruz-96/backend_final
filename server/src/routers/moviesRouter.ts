import { Router } from "express";
import { check } from "express-validator";
import MovieController from "../controllers/MovieController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: API endpoints for managing movies
 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 */
// Get all movies
router.get("/movies", MovieController.getAllMovies);

// Get movie by ID
router.get("/movies/:id", MovieController.getMovieById);

// Create a new movie
router.post(
  "/movies",
  [
    check("title").notEmpty().withMessage("Movie name is required"),
    check("date")
      .notEmpty()
      .isDate()
      .withMessage("Movie release date is required"),
    check("genres").notEmpty().withMessage("Movie genres are required"),
    check("trailer").notEmpty().withMessage("Movie trailer link is required"),
  ],
  MovieController.createMovie
);

// Update an existing movie
router.put(
  "/movies/:id",
  [
    check("title").notEmpty().withMessage("Movie name is required"),
    check("date")
      .notEmpty()
      .isDate()
      .withMessage("Movie release date is required"),
    check("genres").notEmpty().withMessage("Movie genres are required"),
    check("trailer").notEmpty().withMessage("Movie trailer link is required"),
  ],
  MovieController.updateMovie
);

// Delete an existing product
router.delete("/movies/:id", MovieController.deleteMovie);

export default router;
