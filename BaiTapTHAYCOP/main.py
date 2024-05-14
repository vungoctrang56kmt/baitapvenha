from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/weather") #endopoint
async def get_weather_data():
    # Đoạn mã lấy dữ liệu thời tiết
    import requests
    from datetime import datetime, timedelta

    def get_weather_data(city, api_key, date):
        url = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={api_key}&units=metric"
        response = requests.get(url)
        data = response.json()
        return data

    def extract_weather_info(data):
        weather_info = {}
        for item in data['list']:
            # Lấy chỉ ngày từ chuỗi datetime
            date = item['dt_txt'].split()[0]
            if date not in weather_info:
                temperature = item['main']['temp']
                humidity = item['main']['humidity']
                pressure = item['main']['pressure']
                rain = item.get('rain', {}).get('3h', 0)  # Lượng mưa trong 3 giờ (nếu có)
                wind_speed = item['wind']['speed']
                weather_info[date] = {'Date': date, 'Temperature': temperature, 'Humidity': humidity,
                                    'Pressure': pressure, 'City': city}
        return list(weather_info.values())

    def get_past_date(days):
        today = datetime.now()
        past_date = today - timedelta(days=days)
        return past_date.strftime("%Y-%m-%d")

    city = "Thai Nguyen"
    api_key = "093bc10f5336f52a5c3c761e7b731280"
    past_date = get_past_date(7)  # Lấy dữ liệu 1 tuần trước

    weather_data = get_weather_data(city, api_key, past_date)
    weather_info = extract_weather_info(weather_data)

    return JSONResponse(content=weather_info)