if(exists(select * from sys.objects where name = 'proc_GetPhotoByRoomID'))
drop proc proc_GetPhotoByRoomID
go
create proc proc_GetPhotoByRoomID
	@RoomID int
as
begin
	select * from Photos
	where RoomID = @RoomID
end