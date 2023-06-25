select * from Users
select * from Roles

if(exists(select * from sys.objects where name = 'proc_AddRoom'))
drop proc proc_AddRoom
go
create proc proc_AddRoom 
	@UserID int,
	@Name nvarchar(max),
	@Description nvarchar(max),
	@Price float,
	@Area float,
	@RoomID int output
as
begin
	-- 
	insert into Rooms(UserID, Name, Description, Price, Area) values (@UserID, @Name, @Description, @Price, @Area)

	set @RoomID = @@IDENTITY
end
go
