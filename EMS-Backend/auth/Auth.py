from jose import JWTError, jwt

from fastapi import HTTPException, status


def verify_token(token: str, SECRET_KEY: str, ALGORITHM: str):
    try:
        # Decode the token using the secret key and algorithm
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload  # returns the payload data if token is valid
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
