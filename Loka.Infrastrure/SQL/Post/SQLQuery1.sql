select * from Rooms
select * from Users
select * from Roles
select * from Posts

go
if(exists(select * from sys.objects where name = 'proc_DeletePost'))
drop proc proc_DeletePost
go
create proc proc_DeletePost 
	@PostID int
as
begin
	-- Check 
	if(not exists(select * from Posts as p where p.PostID = @PostID))
	begin
		return;
	end;

	-- Delete
	delete from Posts where PostID = @PostID

end
go
