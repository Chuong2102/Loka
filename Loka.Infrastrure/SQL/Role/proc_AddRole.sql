if (exists(select * from sys.objects where name = 'pro_AddRole'))
drop proc proc_AddRole
go
create proc proc_AddRole 
	@RoleName nvarchar(max)
as
begin
	-- Neu bi trung ten role
	if(exists (select * from Roles as r where r.RoleName = @RoleName))
	begin
		return;
	end;

	insert into Roles(RoleName) values (@RoleName)
end