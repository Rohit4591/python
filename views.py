from django.shortcuts import render,HttpResponse
from .models import Department,Role,Employee
from .form import *
from datetime import datetime
from django.db.models import Q
# Create your views here.
def index(request):
    return render(request,'index.html')

def all_emp(request):
    emps=Employee.objects.all()
    context={
        'emps':emps
    }
    return render(request,'all_emp.html',context)

def add_emp(request):
    if request.method == 'POST':
        fm=Employeeform(request.POST)
        if fm.is_valid():
            fm.save()
            return HttpResponse('Employee Added Successfully!!!!')
    else:
        fm=Employeeform()
    return render(request,'add_emp.html',{'form':fm})

def remove_emp(request,emp_id=None):
    if emp_id:
        try:
            emp_remove = Employee.objects.get(id=emp_id)
            emp_remove.delete()
            return HttpResponse('Employee Removed Successfully!!!')
        except:
            return HttpResponse('Please enter A Valid EMP ID')
    emps = Employee.objects.all()
    context={'emps':emps}
    return render(request,'remove_emp.html',context)

def filter_emp(request,id=None):
    if request.method == 'POST':
        name=request.POST['name']
        dept=request.POST['dept']
        role=request.POST['role']
        emps=Employee.objects.all()
        if name:
            emps=emps.filter(Q(first_name__icontains = name) | Q(last_name__icontains = name))
        if dept:
            emps=emps.filter(dept__name__icontains = dept)
        if role:
            emps = emps.filter(role__name__icontains = role)
        context={
            'emps': emps
        }
        return render(request,'all_emp.html',context)

    elif request.method == 'GET':
        return render(request,'filter_emp.html')
    else:
        return HttpResponse('An Exception Occured!!')
    