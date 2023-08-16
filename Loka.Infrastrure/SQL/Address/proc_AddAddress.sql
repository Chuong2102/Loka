select * from Addresses
go
if(exists(select * from sys.objects where name = 'proc_AddAddress'))
drop proc proc_AddAddress
go
create proc proc_AddAddress 
	@RoomID int,
	@AddressLine1 nvarchar(max),
	@AddressLine2 nvarchar(max),
	@WardID int
as
begin
	-- check 
	if(exists(select * from Addresses as p where p.RoomID = @RoomID))
	begin
		return;
	end;

	insert into Addresses(RoomID, AddressLine1, AddressLine2, WardID) values (@RoomID, @AddressLine1, @AddressLine2, @WardID)
end
go

