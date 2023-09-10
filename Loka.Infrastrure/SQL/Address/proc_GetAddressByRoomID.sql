select * from Addresses
go
if(exists(select * from sys.objects where name = 'proc_GetAddressByRoomID'))
drop proc proc_GetAddressByRoomID
go
create proc proc_GetAddressByRoomID 
	@RoomID int
as
begin
	select * from Addresses as p where p.RoomID = @RoomID
end
go