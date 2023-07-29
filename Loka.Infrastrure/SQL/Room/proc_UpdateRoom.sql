if(exists(select * from sys.objects where name = 'proc_UpdateRoom'))
drop proc proc_UpdateRoom
go
create proc proc_UpdateRoom 
	@RoomID int,
	@Name nvarchar(max),
	@Description nvarchar(max),
	@Price float,
	@Area float

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
	if(@Name is null or @Description is null or @Price is null or @Area is null)
		return;

	-- Update Room
	update Rooms
	set Name = @Name,
	Description = @Description,
	Price = @Price,
	Area = @Area
	where RoomID = @RoomID

end
go
----
select * from Posts
select * from Rooms
