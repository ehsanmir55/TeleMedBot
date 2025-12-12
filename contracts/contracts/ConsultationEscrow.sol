// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ConsultationEscrow {
    struct Consultation {
        address patient;
        address doctor;
        uint256 amount;
        bool isCompleted;
        bool isRefunded;
        bool isFunded;
    }

    mapping(uint256 => Consultation) public consultations;
    uint256 public consultationCount;

    event ConsultationCreated(uint256 indexed id, address patient, address doctor, uint256 amount);
    event FundsReleased(uint256 indexed id, address doctor, uint256 amount);
    event Refunded(uint256 indexed id, address patient, uint256 amount);

    function createConsultation(address _doctor) external payable {
        require(msg.value > 0, "Fee must be greater than 0");
        
        consultationCount++;
        consultations[consultationCount] = Consultation({
            patient: msg.sender,
            doctor: _doctor,
            amount: msg.value,
            isCompleted: false,
            isRefunded: false,
            isFunded: true
        });

        emit ConsultationCreated(consultationCount, msg.sender, _doctor, msg.value);
    }

    function completeConsultation(uint256 _id) external {
        Consultation storage consultation = consultations[_id];
        require(msg.sender == consultation.patient, "Only patient can confirm completion");
        require(consultation.isFunded, "Not funded");
        require(!consultation.isCompleted, "Already completed");
        require(!consultation.isRefunded, "Refunded");

        consultation.isCompleted = true;
        payable(consultation.doctor).transfer(consultation.amount);

        emit FundsReleased(_id, consultation.doctor, consultation.amount);
    }

    function refundConsultation(uint256 _id) external {
        Consultation storage consultation = consultations[_id];
        require(msg.sender == consultation.doctor, "Only doctor can issue refund");
        require(consultation.isFunded, "Not funded");
        require(!consultation.isCompleted, "Already completed");
        require(!consultation.isRefunded, "Already refunded");

        consultation.isRefunded = true;
        payable(consultation.patient).transfer(consultation.amount);

        emit Refunded(_id, consultation.patient, consultation.amount);
    }
}
