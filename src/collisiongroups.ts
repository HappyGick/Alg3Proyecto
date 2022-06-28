import { CollisionGroup, CollisionGroupManager } from "excalibur";

export const pieces = CollisionGroupManager.create('pieces');
export const receptors = CollisionGroupManager.create('receptors');

export const collidesWithPieces = CollisionGroup.collidesWith([pieces]);
export const collidesWithReceptors = CollisionGroup.collidesWith([receptors]);