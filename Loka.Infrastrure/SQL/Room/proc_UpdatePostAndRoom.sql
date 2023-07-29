if(exists(select * from sys.objects where name = 'proc_UpdatePost'))
drop proc proc_UpdatePost
go
create proc proc_UpdatePost 
	@RoomID int,
	@Title nvarchar(max)
as
begin
	-- Check ID
	if(not exists(select * from Rooms as r where r.RoomID = @RoomID))
	begin
		return;
	end;
	-- 
	if(not exists(select * from Posts as p where p.RoomID = @RoomID))
	begin
		return;
	end;

	-- Check null
	-- Post
	if(@Title is null)
		return;
	
	-- Update Post
	update Posts
	set Title = @Title
	where RoomID = @RoomID
end
go
----
select * from Posts
select * from Rooms
