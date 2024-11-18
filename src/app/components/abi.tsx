export const userAbi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "profileCid",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "enum patientRecord.Role",
				"name": "_role",
				"type": "uint8"
			}
		],
		"name": "assignRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMedicalRecords",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "issue",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "doctor",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "consultedBy",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "file",
						"type": "string"
					}
				],
				"internalType": "struct patientRecord.MedicalRecord[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			}
		],
		"name": "getMedicalRecordsByDate",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "issue",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "doctor",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "consultedBy",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "file",
						"type": "string"
					}
				],
				"internalType": "struct patientRecord.MedicalRecord[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMedicineRecords",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "doctor",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "file",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "issue",
						"type": "string"
					}
				],
				"internalType": "struct patientRecord.Medicine[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			}
		],
		"name": "getMedicineRecordsByDate",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "doctor",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "file",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "issue",
						"type": "string"
					}
				],
				"internalType": "struct patientRecord.Medicine[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "medicalRecords",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "issue",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctor",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "consultedBy",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "file",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "medicines",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "doctor",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "file",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "issue",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "patientAlergiesCid",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "patientProfileCid",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "removeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "roleAssignments",
		"outputs": [
			{
				"internalType": "enum patientRecord.Role",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_alergies",
				"type": "string"
			}
		],
		"name": "setAlergies",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "issue",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctor",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "consultedBy",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "file",
				"type": "string"
			}
		],
		"name": "setMedicalRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "doctor",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "file",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "issue",
				"type": "string"
			}
		],
		"name": "setMedicineRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "profileCid",
				"type": "string"
			}
		],
		"name": "setPatientProfileCid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export const doctorAbi=
	[
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_profileCid",
					"type": "string"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "OwnableInvalidOwner",
			"type": "error"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "OwnableUnauthorizedAccount",
			"type": "error"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "previousOwner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "doctor",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "profileCid",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "renounceOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_profileCid",
					"type": "string"
				}
			],
			"name": "setProfileCid",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "patientContract",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "date",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "issue",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "consultedBy",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "file",
					"type": "string"
				}
			],
			"name": "updatePatientMedicalRecord",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "patientContract",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "date",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "doctorname",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "file",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "issue",
					"type": "string"
				}
			],
			"name": "updatePatientMedicineRecord",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "patientContract",
					"type": "address"
				}
			],
			"name": "viewPatientMedicalRecords",
			"outputs": [
				{
					"components": [
						{
							"internalType": "uint256",
							"name": "date",
							"type": "uint256"
						},
						{
							"internalType": "string",
							"name": "issue",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "doctor",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "consultedBy",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "file",
							"type": "string"
						}
					],
					"internalType": "struct IPatientRecord.MedicalRecord[]",
					"name": "",
					"type": "tuple[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "patientContract",
					"type": "address"
				}
			],
			"name": "viewPatientMedicineRecords",
			"outputs": [
				{
					"components": [
						{
							"internalType": "uint256",
							"name": "date",
							"type": "uint256"
						},
						{
							"internalType": "string",
							"name": "doctor",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "file",
							"type": "string"
						},
						{
							"internalType": "string",
							"name": "issue",
							"type": "string"
						}
					],
					"internalType": "struct IPatientRecord.Medicine[]",
					"name": "",
					"type": "tuple[]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]

export const systemAbi=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "aadharHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "Account",
				"type": "address"
			}
		],
		"name": "NewAadharHashStored",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_aadharHash",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "storeAadharHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_doctorLicence",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "storeDoctorAccount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "aadharHashToAccount",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_doctorLicence",
				"type": "string"
			}
		],
		"name": "getDoctorAccount",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_aadharHash",
				"type": "string"
			}
		],
		"name": "getPatientAccount",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "licenceToAccount",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]