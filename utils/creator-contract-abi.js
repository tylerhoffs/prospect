export const contractAbi = [
	{
		"inputs": [
			{
				"internalType": "contract ISuperfluid",
				"name": "host",
				"type": "address"
			},
			{
				"internalType": "contract IConstantFlowAgreementV1",
				"name": "cfa",
				"type": "address"
			},
			{
				"internalType": "contract IInstantDistributionAgreementV1",
				"name": "ida",
				"type": "address"
			},
			{
				"internalType": "contract ISuperToken",
				"name": "inToken",
				"type": "address"
			},
			{
				"internalType": "contract ISuperToken",
				"name": "outToken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "staking",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "InvalidToken",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Unauthorized",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "distributionAmount",
				"type": "uint256"
			}
		],
		"name": "ActionExecuted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amountOwed",
				"type": "uint256"
			}
		],
		"name": "ActionFailed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "contract ISuperToken",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "agreementClass",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "agreementId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "agreementData",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "ctx",
				"type": "bytes"
			}
		],
		"name": "afterAgreementCreated",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "newCtx",
				"type": "bytes"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract ISuperToken",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "agreementClass",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "agreementData",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "cbdata",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "ctx",
				"type": "bytes"
			}
		],
		"name": "afterAgreementTerminated",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract ISuperToken",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "agreementClass",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "agreementId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "agreementData",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "ctx",
				"type": "bytes"
			}
		],
		"name": "afterAgreementUpdated",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "newCtx",
				"type": "bytes"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract ISuperToken",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "beforeAgreementCreated",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract ISuperToken",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "agreementClass",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "agreementId",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "beforeAgreementTerminated",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract ISuperToken",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"name": "beforeAgreementUpdated",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "executeAction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "ctx",
				"type": "bytes"
			}
		],
		"name": "executeActionInCallback",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "newCtx",
				"type": "bytes"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastDistribution",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
