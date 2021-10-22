/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { ReceivedTransferBusiness } from '../generated/Business/Business'
// import { OrganisationRegistered } from '../generated/Master/Master'
// import { Organisation, OrganisationTransaction, Sender } from '../generated/schema'

// export function handleCreateNewService(event: OrganisationRegistered): void {
//   let senderString = event.params.sender.toHexString()

//   let sender = Sender.load(senderString)

//   if (sender == null) {
//     sender = new Sender(senderString)
//     sender.address = event.params.sender
//     sender.createdAt = event.block.timestamp
//     // sender.purposeCount = BigInt.fromI32(1)
//   } else {
//     // sender.purposeCount = sender.purposeCount.plus(BigInt.fromI32(1))
//   }

//   let organisationContractAddress = event.params.organisationAddress.toHexString()
//   let organisation = new Organisation(organisationContractAddress)

//   organisation.address = event.params.organisationAddress
//   organisation.sender = senderString
//   organisation.createdAt = event.block.timestamp
//   organisation.transactionHash = event.transaction.hash.toHex()

//   organisation.save()
//   sender.save()
// }

// export function handleBusinessTransaction(event: ReceivedTransferBusiness): void {
//   let senderString = event.params.sender.toHexString()
//   let organisationContractAddress = event.params.organisationContractAddress.toHexString()

//   // let organisation = Organisation.load(receiverString)

//   let sender = Sender.load(senderString)

//   if (sender == null) {
//     sender = new Sender(senderString)
//     sender.address = event.params.sender
//     sender.createdAt = event.block.timestamp
//   }

//   // let organisation = Organisation.load(organisationContractAddress)

//   // if (organisation == null) {
//   //   organisation = new Organisation(organisationContractAddress)
//   //   organisation.address = event.params.organisationContractAddress
//   //   organisation.createdAt = event.block.timestamp
//   // }

//   // @ts-ignore
//   let organisationTransaction = new OrganisationTransaction(
//     event.transaction.hash.toHex() + '-' + event.logIndex.toString()
//   )

//   organisationTransaction.sender = senderString
//   organisationTransaction.amount = event.params.amount
//   organisationTransaction.organisation = organisationContractAddress
//   organisationTransaction.createdAt = event.block.timestamp
//   organisationTransaction.transactionHash = event.transaction.hash.toHex()

//   organisationTransaction.save()
//   // organisation.save()
//   sender.save()
// }
