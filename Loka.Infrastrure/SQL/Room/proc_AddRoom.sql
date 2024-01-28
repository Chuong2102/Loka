if(exists(select * from sys.objects where name = 'proc_AddRoom'))
drop proc proc_AddRoom
go
create proc proc_AddRoom 
	@UserID int,
	@Description nvarchar(max),
	@Price float,
	@Area float,
	@RoomID int output
as
begin
	-- 
	insert into Rooms(UserID, Name, Description, Price, Area) values (@UserID, @Description, @Description, @Price, @Area)

	set @RoomID = @@IDENTITY
end
go
