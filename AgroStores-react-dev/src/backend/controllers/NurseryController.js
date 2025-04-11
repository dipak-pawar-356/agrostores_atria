// filepath: src/backend/controllers/NurseryController.js
import { Response } from "miragejs";

export const getAllNurseriesHandler = function () {
  return new Response(200, {}, { nurseries: this.db.nurseries });
};

export const getNurseryByIdHandler = function (schema, request) {
  const nurseryId = request.params.nurseryId;
  try {
    const nursery = schema.nurseries.findBy({ _id: nurseryId });
    return new Response(200, {}, { nursery });
  } catch (error) {
    return new Response(500, {}, { error: "Nursery not found" });
  }
};