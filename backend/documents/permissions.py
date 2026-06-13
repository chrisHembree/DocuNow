from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(
            name='Admins'
        ).exists()




class IsManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(
            name='Managers'
        ).exists()


class IsEmployee(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(
            name='Employees'
        ).exists()


class IsViewer(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(
            name='Viewers'
        ).exists()
    

class CanViewDocuments(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.groups.filter(
                name__in=[
                    'Admins',
                    'Managers',
                    'Employees',
                    'Viewers',
                ]
            ).exists()
        )


class CanUploadDocuments(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.groups.filter(
                name__in=[
                    'Admins',
                    'Managers',
                    'Employees',
                ]
            ).exists()
        )


class CanModifyDocuments(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.groups.filter(
                name__in=[
                    'Admins',
                    'Managers',
                ]
            ).exists()
        )








