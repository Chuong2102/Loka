select * from Locations
go
if(exists(select * from sys.objects where name = 'proc_AddLocation'))
drop proc proc_AddLocation
go
create proc proc_AddLocation 
	@RoomID int,
	@PlaceID nvarchar(max),
	@Latitude float,
	@Longtitude float,
	@LocationPoint geography
as
begin
	-- check 
	if(not exists(select * from Locations as p where p.RoomID = @RoomID))
	begin
		return;
	end;

	insert into Locations(RoomID, PlaceID, Latitude, Longitude, LocationPoint) values (@RoomID, @PlaceID, @Latitude, @Longtitude, @LocationPoint)
end
go
