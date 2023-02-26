import { Request, Response, Router } from "express";

const router: Router = Router();

// get all users
router.get("/", (req: Request, res: Response) => {
  console.log(req, res);
});

// post user
router.post("/", (req: Request, res: Response) => {
  console.log(req, res);
});

// edit user
router.put("/:id", (req: Request, res: Response) => {
  console.log(req, res);
});

// delete user
router.delete("/:id", (req: Request, res: Response) => {
  console.log(req, res);
});

module.exports = router;
