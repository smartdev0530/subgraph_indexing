import * as UserAction from '../generated/UserAction/UserAuction'
import * as MonstaEvent from '../generated/MonstaToken/MonstaToken'
import {MonstaNFT, MonstaEvolve, MonstaRebirth, MonstaRetire, MonstaSpawn, 
  AuctionCancel, AuctionSucceed, AuctionCreate, Transfer} from '../generated/schema'
import { BigInt } from '@graphprotocol/graph-ts'



export function handleUserAuctionCreated(event: UserAction.AuctionCreated): void {
  let nft = _createMonstaIfNotExist(event.params._tokenId.toHex())

  //make Auction Create 
  let id = event.transaction.hash.toHex()
  let createdAuction = new AuctionCreate(id);
  createdAuction.token = nft.id;
  createdAuction.timestamp = event.block.timestamp
  createdAuction.startingPrice = event.params._startingPrice
  createdAuction.endingPrice = event.params._endingPrice
  createdAuction.seller = event.params._seller;
  createdAuction.duration = event.params._duration;
  createdAuction.type = "UserAuction"
  createdAuction.save()
}

export function handleUserAuctionCancelled(event : UserAction.AuctionCancelled) : void {

  let nft = _createMonstaIfNotExist(event.params._tokenId.toHex())

  let id = event.transaction.hash.toHex() 

  //save AuctionCancelled
  let cancelledAuction = new AuctionCancel(id)
  cancelledAuction.token = nft.id
  cancelledAuction.timestamp = event.block.timestamp
  cancelledAuction.type = "UserAuction"
  cancelledAuction.save()
}

export function handleUserAuctionSuccessful(event : UserAction.AuctionSuccessful) : void {
  let nft = _createMonstaIfNotExist(event.params._tokenId.toHex())

  let id = event.transaction.hash.toHex() 

  let successAuction = new AuctionSucceed(id)
  successAuction.timestamp = event.block.timestamp
  successAuction.token = nft.id
  successAuction.winner = event.params._winner
  successAuction.totalPrice = event.params._totalPrice
  successAuction.type = "UserAuction"
  successAuction.save()
}



export function handleSysAuctionCreated(event: UserAction.AuctionCreated): void {
  let nft = _createMonstaIfNotExist(event.params._tokenId.toHex())

  //make Auction Create 
  let id = event.transaction.hash.toHex()
  let createdAuction = new AuctionCreate(id);
  createdAuction.token = nft.id;
  createdAuction.timestamp = event.block.timestamp
  createdAuction.startingPrice = event.params._startingPrice
  createdAuction.endingPrice = event.params._endingPrice
  createdAuction.seller = event.params._seller;
  createdAuction.duration = event.params._duration;
  createdAuction.type = "SystemAuction"
  createdAuction.save()
}

export function handleSysAuctionCancelled(event : UserAction.AuctionCancelled) : void {

  let nft = _createMonstaIfNotExist(event.params._tokenId.toHex())

  let id = event.transaction.hash.toHex() 

  //save AuctionCancelled
  let cancelledAuction = new AuctionCancel(id)
  cancelledAuction.token = nft.id
  cancelledAuction.timestamp = event.block.timestamp
  cancelledAuction.type = "SystemAuction"
  cancelledAuction.save()
}

export function handleSysAuctionSuccessful(event : UserAction.AuctionSuccessful) : void {
  let nft = _createMonstaIfNotExist(event.params._tokenId.toHex())

  let id = event.transaction.hash.toHex() 

  let successAuction = new AuctionSucceed(id)
  successAuction.timestamp = event.block.timestamp
  successAuction.token = nft.id
  successAuction.winner = event.params._winner
  successAuction.totalPrice = event.params._totalPrice
  successAuction.type = "SystemAuction"
  successAuction.save()
}

export function handleMonstaSpawned(event : MonstaEvent.MonstaSpawned) : void {

  let nft = _createMonstaIfNotExist(event.params._monstaId.toHex())  // useless

  let id = event.transaction.hash.toHex() 
  let spawnedMonsta = new MonstaSpawn(id)
  spawnedMonsta.token = nft.id
  // set matron
  if (!event.params._matronId.equals(BigInt.zero())) {
    spawnedMonsta.matron = event.params._matronId.toHex()
  }
  //set sire
  if (!event.params._sireId.equals(BigInt.zero())) {
    spawnedMonsta.matron = event.params._sireId.toHex()
  }
  spawnedMonsta.owner = event.params._owner
  spawnedMonsta.timestamp =  event.block.timestamp
  spawnedMonsta.genes = event.params._genes
  spawnedMonsta.save()
}

export function handleMonstaRebirthed(event : MonstaEvent.MonstaRebirthed) : void {

  let nft =_createMonstaIfNotExist(event.params._monstaId.toHex())  // useless

  let id = event.transaction.hash.toHex() 

  let rebirthedMonsta = new MonstaRebirth(id)
  rebirthedMonsta.token = nft.id
  rebirthedMonsta.timestamp = event.block.timestamp
  rebirthedMonsta.genes = event.params._genes
  rebirthedMonsta.save()
}

export function handleMonstaRetired(event : MonstaEvent.MonstaRetired) : void {

  let nft = _createMonstaIfNotExist(event.params._monstaId.toHex())  // useless

  let id = event.transaction.hash.toHex() 
  let retireMonsta = new MonstaRetire(id)
  retireMonsta.token = nft.id
  retireMonsta.timestamp = event.block.timestamp
  retireMonsta.save()
}

export function handleMonstaEvolved(event : MonstaEvent.MonstaEvolved) : void {
  
  let nft = _createMonstaIfNotExist(event.params._monstaId.toHex())  // useless

  let id = event.transaction.hash.toHex() 
  let evolvedMonsta = new MonstaEvolve(id)
  evolvedMonsta.token = nft.id
  evolvedMonsta.timestamp = event.block.timestamp
  evolvedMonsta.oldGenes = event.params._oldGenes
  evolvedMonsta.newGenes = event.params._newGenes
  evolvedMonsta.save()
}

export function handleTransfer(event : MonstaEvent.Transfer) : void {
  
  let nft = _createMonstaIfNotExist(event.params.tokenId.toHex())  // useless

  let id = event.transaction.hash.toHex() 
  let transfer = new Transfer(id)
  transfer.to = event.params.to
  transfer.from = event.params.from
  transfer.timestamp = event.block.timestamp
  transfer.token = nft.id
  transfer.save()

}

function _createMonstaIfNotExist(monstaId : string) : MonstaNFT {
  let nft = MonstaNFT.load(monstaId) 
  if (nft == null) {
    nft = new MonstaNFT(monstaId)
    nft.save()
  }
  return nft;
}



