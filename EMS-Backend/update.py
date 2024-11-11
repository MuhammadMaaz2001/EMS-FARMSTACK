def UpdateData(props):
    return {
        "id": str(props["_id"]),
        "name": props["name"],
        "email": props["email"],
        "responsibility": props["responsibility"],
        "additional_information": props["additional_information"],
    }