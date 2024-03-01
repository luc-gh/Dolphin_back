import express from "express";
import dotenv from "dotenv";
import * as noteService from "../services/noteService.js";

dotenv.config({path: ".env"});