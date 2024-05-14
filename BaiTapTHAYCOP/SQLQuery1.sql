use BaiTapPT
go 
create table thoi_tiet( 
City NVARCHAR(255), 
Date DATE, 
Temperature FLOAT, 
Humidity FLOAT, 
Pressure FLOAT, 
) 

drop table thoi_tiet
CREATE PROCEDURE GetThoiTietData 
AS 
BEGIN 
SELECT * FROM thoi_tiet; 
END 