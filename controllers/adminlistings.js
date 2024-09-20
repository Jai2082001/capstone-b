const { ObjectId } = require('mongodb');
const LegalOrgs = require('../models/legalorgs');
const Permissions = require('../models/permissions');
const jobs = require('../models/jobs');

exports.displayCase = (req, res, next) => {
    const { _id } = req.headers;

    jobs.find({}).then((response)=>{
        console.log(response)
        res.send(response);
    })
    // if (_id) {
    //     console.log('Display Listing');
    //     LegalOrgs.find({AddedBy: _id}).then((response) => {
    //         console.log(response);
    //         res.send(response)
    //     })
    // } else {
    //     console.log('Display Legal Aids');
    //     LegalOrgs.find().then((response) => {
    //         console.log(response);
    //         res.send(response)
    //     })
    // }

}

exports.saveCase = (req, res, next) => {
    console.log('Jobs ----------------');

    const {positionname, available, field, description, requirement, image} = req.body

    if (AddedBy == 'Admin') {
        jobs.findOne({ LegalProName: legalProName }).then((response) => {
            if (!response) {
                const jobs = new jobs({ PositionName: positionname, Availability: available, Field: field, Description: description, ImageUrl:  image, Req})
                jobs.save().then((response) => {
                    res.send({status: 'good'})
                }).catch((err) => {
                    console.log(err)
                    console.log('Instance not saved');
                });
            } else {
                res.send({status: 'error', message: 'Legal Orgs opportunity already exists'})
                console.log('Legal Orgs opportunity already exists');
            }
        }).catch((err) => {
            console.log('Error while confirming the availability of the email');
        })
    } else {
        Permissions.findOne({ OrId: AddedBy, Activity: 'Save', Model: 'Legal', UniqueKey: req.body.UniqueKey }).then((response) => {
            if (!response) {
                const PermissionsInstance = new Permissions({ OrId: AddedBy, Activity: 'Save', Model: 'Legal', UniqueKey: req.body.UniqueKey, Permission: { PositionName: positionname, Availability: available, Field: field, Description: description, ImageUrl:  image, Requirement: requirement}, Status: 'No' })

                PermissionsInstance.save().then((response) => {
                    res.send(response)
                    console.log(response);
                }).catch((response) => {
                    console.log(response);
                    res.send(response);
                })
            }
        })
    }

}

exports.deleteCase = (req, res, next) => {
    console.log("Delete Case");
    console.log(req)
    LegalOrgs.deleteOne({ _id: req.headers.id }).then((response) => {
        res.send(response);
    })
}

exports.updateCase = (req, res, next) => {
    console.log('Update Legals');
    const { LegalOrgName, LegalProName, LegalOrgDescription, LegalProDescription, ContactInfo, image } = req.body;

    LegalOrgs.updateOne({ _id: new ObjectId(req.headers.id) }, {
        $set: {
            LegalOrgName: LegalOrgName,
            LegalOrgDescription: LegalOrgDescription,
            ImageUrl: image,
            LegalProName: LegalProName,
            ContactInfo: ContactInfo,
            LegalProDescription: LegalProDescription
        }
    }).then((response) => {
        res.send(response)
    })
}


exports.detailLegal = (req, res, next) => {
    console.log('detailLegal');
    const { id } = req.headers;

    LegalOrgs.findOne({ _id: id }).then((response) => {
        res.send(response);
    })
}