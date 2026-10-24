import PDFDocument from "pdfkit";
import { Response } from "express";
import mongoose from "mongoose";
import { Mission } from "../models/Mission.model.js";

export const downloadMissionPdf = async (req:Request , res:Response,id: string): Promise<void> => {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid mission ID" });
    return;
  }

  const mission = await Mission.findById(id)
    .populate("trajetId")
    .populate("chauffeurId", "name email")
    .populate("camionId")
    .populate("remorqueId");

  if (!mission) {
    res.status(404).json({ message: "Mission not found" });
    return;
  }

  if (role === "chauffeur" && mission.chauffeurId._id.toString() !== userId) {
    res.status(403).json({ message: "You cannot download this mission" });
    return;
  }

  const trajet = mission.trajetId as any;
  const chauffeur = mission.chauffeurId as any;
  const camion = mission.camionId as any;
  const remorque = mission.remorqueId as any;

  const doc = new PDFDocument({ margin: 50, size: "A4" });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="mission-${mission._id}.pdf"`,
  );

  doc.pipe(res);

  doc.fontSize(22).text("MISSION DE TRANSPORT", { align: "center" });
  doc.moveDown();

  doc.fontSize(11).text(`Mission ID: ${mission._id}`);
  doc.text(
    `Date d'affectation: ${mission.dateAssignation.toLocaleDateString("fr-FR")}`,
  );

  doc.moveDown();
  doc.fontSize(16).text("Informations du trajet");
  doc.moveDown(0.5);

  doc.fontSize(11);
  doc.text(`Départ: ${trajet.depart ?? "Non renseigné"}`);
  doc.text(`Arrivée: ${trajet.arrivee ?? "Non renseignée"}`);
  doc.text(
    `Date de départ prévue: ${
      trajet.dateDepartPrevue
        ? new Date(trajet.dateDepartPrevue).toLocaleString("fr-FR")
        : "Non renseignée"
    }`,
  );
  doc.text(
    `Date d'arrivée prévue: ${
      trajet.dateArriveePrevue
        ? new Date(trajet.dateArriveePrevue).toLocaleString("fr-FR")
        : "Non renseignée"
    }`,
  );
  doc.text(`Marchandise: ${trajet.marchandise ?? "Non renseignée"}`);
  doc.text(`Statut: ${trajet.statut ?? "Non renseigné"}`);

  doc.moveDown();
  doc.fontSize(16).text("Chauffeur");
  doc.moveDown(0.5);
  doc.fontSize(11);
  doc.text(`Nom: ${chauffeur.name ?? "Non renseigné"}`);
  doc.text(`Email: ${chauffeur.email ?? "Non renseigné"}`);

  doc.moveDown();
  doc.fontSize(16).text("Véhicules");
  doc.moveDown(0.5);
  doc.fontSize(11);
  doc.text(`Camion: ${camion.matricule ?? "Non renseigné"}`);
  doc.text(`Modèle: ${camion.modele ?? "Non renseigné"}`);
  doc.text(`Remorque ID: ${remorque._id}`);

  doc.moveDown(2);
  doc.fontSize(9).text("Document généré par le système de gestion de flotte.", {
    align: "center",
  });

  doc.end();
};
