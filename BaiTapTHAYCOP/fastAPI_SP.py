from fastapi import FastAPI, HTTPException
from typing import List
from pydantic import BaseModel
import pyodbc

app = FastAPI()

# Thiết lập thông tin kết nối tới cơ sở dữ liệu SQL Server
server = 'Neki'
database = 'BaiTapPT'
username = 'sa'
password = '2402'
cnxn = pyodbc.connect('DRIVER={SQL Server};SERVER='+server+';DATABASE='+database+';UID='+username+';PWD='+password)

# Định nghĩa model cho dữ liệu thời tiết
class ThoiTietData(BaseModel):
    City: str
    Temperature: float
    Humidity: int
    Pressure: int
    Date: str

# Định nghĩa route để lấy dữ liệu từ stored procedure
@app.get("/thoitietdata/", response_model=List[ThoiTietData])
async def get_thoitiet_data():
    try:
        cursor = cnxn.cursor()
        # Gọi stored procedure GetThoiTietData
        cursor.execute("{CALL GetThoiTietData}")
        rows = cursor.fetchall()

        # Chuyển dữ liệu thành danh sách các từ điển
        result = []
        for row in rows:
            result.append({
                'City': row.City,
                'Temperature': row.Temperature,
                'Humidity': row.Humidity,
                'Pressure': row.Pressure,
                'Date': row.Date
            })

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8810)
