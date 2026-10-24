
import { GoogleGenAI } from "@google/genai";
import {trajetService} from "../services/trajetService.js";
import { Request, Response } from "express";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function analyzeTrip(
  req: Request,
  res: Response
) {
  try {
    const id  = String(req.params.id);

    const trajet = await trajetService.getTrajetById(id);

    if (!trajet) {
      return res.status(404).json({
        message: "Trajet not found",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        Analyse ce trajet et donne un résumé,
        une analyse de la consommation de carburant,
        et des recommandations.

        Données du trajet :
        ${JSON.stringify(trajet)}
      `,
    });

    return res.status(200).json({
      trajet,
      analysis: response.text,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur lors de l'analyse du trajet",
    });
  }
}
