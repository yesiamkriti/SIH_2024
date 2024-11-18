export interface userContactsDetail{
    address:string;
}
export interface userPersonalInfo{
    gender:string;
    blood_type:string;
    dob:string;
    father_name:string;
    mother_name:string;
}
export interface userMedicalHistory{
    condition:string;
    last_checkup:string;
    upcoming_checkup:string;
    hospital_name:string;
    doctor_name:string;
    allergies:[];

}

export interface userProfile{
    contact_details:userContactsDetail;
    personal_info:userPersonalInfo;
    medical_history:userMedicalHistory;

}
export interface userData{
    first_name:string;
    last_name:string;
    phone_no:string;
    email_address:string;
    created_date:string;
    auid:string;
    contact_details:userContactsDetail;
    personal_info:userPersonalInfo;
    medical_history:userMedicalHistory;

  }
