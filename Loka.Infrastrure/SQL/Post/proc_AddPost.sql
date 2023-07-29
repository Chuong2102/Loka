select * from Rooms
select * from Users
select * from Roles
select * from Posts

go
if(exists(select * from sys.objects where name = 'proc_AddPost'))
drop proc proc_AddPost
go
create proc proc_AddPost 
	@RoomID int,
	@Title nvarchar(max)
as
begin
	-- check 
	if(exists(select * from Posts as p where p.RoomID = @RoomID))
	begin
		return;
	end;

	insert into Posts(RoomID, Title, PostedDate) values (@RoomID, @Title, getdate())
end
go
