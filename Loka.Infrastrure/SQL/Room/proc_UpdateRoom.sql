if(exists(select * from sys.objects where name = 'proc_UpdateRoom'))
drop proc proc_UpdateRoom
go
create proc proc_UpdateRoom 
	@RoomID int,
	@Description nvarchar(max)

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
	-- Check Room
	if(@Description is null)
		return;

	-- Update Room
	update Rooms
	set
	Description = @Description
	where RoomID = @RoomID

end
go
----
select * from Posts
select * from Rooms
select * from Photos